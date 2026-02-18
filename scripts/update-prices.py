import re
import os

print("CWD:", os.getcwd())

# Search for the file
file_path = None
for root, dirs, files in os.walk('/vercel'):
    for f in files:
        if f == 'character-marketplace.tsx':
            file_path = os.path.join(root, f)
            print(f"Found: {file_path}")
            break
    if file_path:
        break

if not file_path:
    # Also try CWD
    for root, dirs, files in os.walk('.'):
        for f in files:
            if f == 'character-marketplace.tsx':
                file_path = os.path.join(root, f)
                print(f"Found: {file_path}")
                break
        if file_path:
            break

if not file_path:
    raise FileNotFoundError("Could not find character-marketplace.tsx")

print(f"Using: {file_path}")

with open(file_path, 'r') as f:
    content = f.read()

# Extract all current prices
old_prices = [float(p) for p in re.findall(r'price: (\d+\.\d+)', content)]
print(f"Found {len(old_prices)} prices")
print(f"Current range: ${min(old_prices)} - ${max(old_prices)}")

# Target range: 267.99 - 389.99
target_min = 267.99
target_max = 389.99
old_min = min(old_prices)
old_max = max(old_prices)

def remap_price(match):
    old_price = float(match.group(1))
    if old_max == old_min:
        ratio = 0.5
    else:
        ratio = (old_price - old_min) / (old_max - old_min)
    new_price = target_min + ratio * (target_max - target_min)
    # Round to nearest .99
    new_price = int(new_price) + 0.99
    return f'price: {new_price:.2f}'

updated = re.sub(r'price: (\d+\.\d+)', remap_price, content)

with open(file_path, 'w') as f:
    f.write(updated)

# Verify
with open(file_path, 'r') as f:
    new_content = f.read()

new_prices = [float(p) for p in re.findall(r'price: (\d+\.\d+)', new_content)]
print(f"\nUpdated {len(new_prices)} prices")
print(f"New range: ${min(new_prices)} - ${max(new_prices)}")
for i, p in enumerate(new_prices[:10]):
    print(f"  Char {i+1}: ${p}")
