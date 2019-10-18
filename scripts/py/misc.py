import numpy
import random

for i in range(10):
    p1 = random.random()
    p2 = random.random()
    diff = (p1 - p2) / 2
    px1 = 0.5 + diff
    px2 = 0.5 - diff
    print(f'{p1:.2f} {p2:.2f}. diff: {diff:.2f}\n{px1:.2f} {px2:.2f} {px1+px2:.2f}\n')
    #print(numpy.random.choice(['A', 'B'], p=[0.2, 0.2]))