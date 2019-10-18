import itertools
import random

weights = [-1.0, -0.8, -0.6, -0.5, -0.34, 0, 0.32, 0.4, 0.5, 0.8, 1.0]
pairs = list(itertools.permutations(weights, 2))

print(list(pairs))

def order_pair(a, b):
    diff = (a - b) / 2
    pa = 0.5 + diff
    pb = 0.5 - diff
    # assert pa + pb == 1
    roll = random.random()

    print(f'\nGiven: [{a}, {b}]')
    print(f'We have a diff of: {diff:.02f}')
    print(f'With adjusted probabilities of [{pa:.02f}, {pb:.02f}]')
    print(f'With a roll of: {roll:.02f}')
    print('b goes first' if roll < pa else 'a goes first')

    return [b, a] if roll < pa else [a, b]


for pair in pairs:
    print(order_pair(pair[0], pair[1]))