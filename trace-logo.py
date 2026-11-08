"""Trace the four existing logo regions into code-native SVG animation paths.
The original PNG is preserved. Requires opencv-python; only used for authoring.
"""
import cv2
import json
from pathlib import Path
root = Path(__file__).parent
im = cv2.imread(str(root / 'public/crona.png'), -1)
mask = ((im[:, :, 3] > 80) & (im[:, :, 0] > 80) & (im[:, :, 2] < 180)).astype('uint8') * 255
n, labels, stats, _ = cv2.connectedComponentsWithStats(mask)
ids = [i for i in range(1, n) if stats[i, 4] > 500]
assert len(ids) == 4
def path(binary):
    contours, _ = cv2.findContours(binary, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    result = []
    for c in contours:
        if cv2.contourArea(c) < 100: continue
        pts = cv2.approxPolyDP(c, 1.1, True).reshape(-1, 2)
        result.append('M' + ' L'.join(f'{x},{y}' for x,y in pts) + 'Z')
    return ' '.join(result)
parts = [path((labels == i).astype('uint8') * 255) for i in ids]
joined = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (85,85)))
(root / 'src/logo-paths.json').write_text(json.dumps({'parts':parts, 'metal':path(joined)}))
