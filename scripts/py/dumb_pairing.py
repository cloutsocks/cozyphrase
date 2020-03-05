import random

a = ['cotton', 'moon', 'sky', 'lark', 'cloud', 'opal', 'dew', 'palm', 'ebony', 'ivory', 'fig', 'leaf', 'river', 'ocean', 'thorn', 'rye', 'wilde', 'cedar', 'birch', 'ebon', 'pine', 'fern', 'anise', 'wood', 'fox', 'ash', 'bow', 'ivy', 'moss', 'fir', 'oak', 'saw', 'fog', 'ore', 'star', 'moon', 'sun', 'bone', 'dawn', 'dusk', 'fawn', 'mist', 'misty', 'mush', 'pale', 'sage', 'duck', 'grim', 'soot', 'quiet', 'lunar', 'solar', 'berry', 'green', 'sage', 'fog', 'lake', 'creek', 'willow', 'cast', 'sleepy', 'ice']
b = ['crest', 'cove', 'grove', 'clove', 'wood', 'woods', 'lane', 'lark', 'bane', 'view', 'ham', 'ford', 'bay', 'run', 'shire', 'pass', 'tide', 'keep', 'rest', 'berry', 'holme', 'song', 'dust', 'drop', 'hills', 'pointe', 'row', 'flat', 'park', 'green', 'ridge', 'away', 'time']

uniques = []

for i in range(1000000):
  phrase = f'{random.choice(a)} {random.choice(b)}'
  uniques.append(phrase)

uniques = list(set(uniques))

print('\n'.join(uniques))