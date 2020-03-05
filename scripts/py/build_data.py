import pprint
import random
import json
import sys

import gspread
import os
import inflect
import pronouncing

from oauth2client.service_account import ServiceAccountCredentials

saveToFile = False
phraseCount = 500 #5000

p = inflect.engine()

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name('../../config/puppypost-dae4df89a47e.json', scope)
with open('../../config/config.json') as f:
    config = json.load(f)

gc = gspread.authorize(credentials)
spreadsheet = gc.open_by_key(config['sheet_key'])
worksheet = spreadsheet.worksheet('words')
sheet = worksheet.get_all_values()


# print(sheet)

titles = {}
affinities = set()
# for row in sheet[1:]:
#     t = row[1]
#     if t and t not in titles and not t.startswith('*'):
#         tags = {tag for tag in row[5:] if tag}
#         if 'acnh' not in tags:
#             continue
#
#         titles[t] = {
#             'wt': float(row[2]) if row[2] else 0,
#             'rank': int(row[3]) if row[3] else 10,
#             'plural': float(row[4]) if row[4] else 0,
#             'tags': tags
#         }
#         affinities.add(titles[t]['wt'])

for row in sheet[1:]:
    t = row[1]
    if t and t not in titles and not t.startswith('*'):
        tags = {tag for tag in row[5:] if tag}
        if 'acnh' not in tags:
            continue

        titles[t] = {
            'wt': float(row[2]) if row[2] else 0,
            'rank': int(row[3]) if row[3] else 10,
            'plural': float(row[4]) if row[4] else 0,
            'tags': tags
        }
        affinities.add(titles[t]['wt'])



# pprint.pprint(sorted(list(affinities)))

# animals = []
# animals_sheet = spreadsheet.worksheet('animals').get_all_values()
# for row in animals_sheet:
#     t = row[0]
#     if t and t not in titles and not t.startswith('*'):
#         titles[t] = {
#             'wt': 0,
#             'rank': 10,
#             'plural': 0,
#             'tags': 'animal'
#         }
#         affinities.add(titles[t]['wt'])
#         animals.append(t)
#
# colors = []
# colors_sheet = spreadsheet.worksheet('colors').get_all_values()
# for row in colors_sheet:
#     t = row[0] + '#' if row[0] else None
#     if t and t not in titles and not t.startswith('*'):
#         titles[t] = {
#             'wt': -1,
#             'rank': 2,
#             'plural': 0,
#             'tags': 'color'
#         }
#         affinities.add(titles[t]['wt'])
#         colors.append(t)
#
#         if not t[:-1] in titles:
#             titles[t[:-1]] = titles[t]
#
#
# foods = []
# food_sheet = spreadsheet.worksheet('food').get_all_values()
# for row in food_sheet:
#     t = row[0]
#     if t and t not in titles and not t.startswith('*'):
#         titles[t] = {
#             'wt': 0,
#             'rank': 4,
#             # 'plural': 0,
#             'tags': 'food'
#         }
#         affinities.add(titles[t]['wt'])
#         foods.append(t)


pprint.pprint(titles)
#pprint.pprint(sorted(list(affinities)))


def make_pair(alliteration=False, sampleColors=False, sampleAnimals=False):
    while True:
        l = random.sample(titles.keys(), 2)
        a, b = l

        if is_double_prefix_or_suffix(a, b):
            continue

        if alliteration and (' ' in a or ' ' in b or a[0] != b[0]):
            continue

        if not sampleColors and not alliteration and \
                (('color' in titles[a]['tags'] and titles[a]['rank'] > 1) or
                 ('color' in titles[b]['tags'] and titles[b]['rank'] > 1)):
            continue

        if not sampleAnimals and not alliteration and \
                (('animal' in titles[a]['tags'] and titles[a]['rank'] > 1) or
                 ('animal' in titles[b]['tags'] and titles[b]['rank'] > 1)):
            continue
        break
    return order_pair(a, b)


def is_double_prefix_or_suffix(a, b, strict=True):
    threshold = 1 if strict else 0.75 #8
    return titles[a]['wt'] <= -threshold and titles[b]['wt'] <= -threshold or \
           titles[a]['wt'] >= threshold and titles[b]['wt'] >= threshold


def order_pair(a, b):
    if abs(titles[a]['wt']) == 1:
        return [a, b] if titles[a]['wt'] == -1 else [b, a]
    if abs(titles[b]['wt']) == 1:
        return [b, a] if titles[b]['wt'] == -1 else [a, b]

    diff = (titles[a]['wt'] - titles[b]['wt']) / 2
    pa = 0.5 + diff
    # pb = 0.5 - diff
    # assert pa + pb == 1
    roll = random.random()
    # if diff != 0:
    #     print(f'[{a}, {b}]')
    #     print(roll)
    #     print(f'affinities: {titles[a]["wt"]}, {titles[b]["wt"]}\nPA: {pa}, diff: {diff}')
    return [b, a] if roll < pa else [a, b]


def join_pair(a=None, b=None, pair=None, clean=False):
    if pair:
        a, b = pair

    if clean:
        a = remove_markup(a)
        b = remove_markup(b)

    if a.endswith('-') or b.startswith('-'):
        return a + b

    if b.startswith('^'):
        return a + b[1:]

    return f'{a} {b}'


def base_title(t):
    return t.strip(' -*#^')

def remove_markup(t):
    return t.strip('*#^')


log = []
for i in range(phraseCount):
    # print(' '.join(make_pair(alliteration=True)))
    pair = make_pair(alliteration=i % 10 == 0, sampleColors=random.random() < 0.3)
    # pair = make_pair(alliteration=True, sampleColors=random.random() < 0.3)

    # pair = [p.plural_noun(pair[0]), p.plural_noun(pair[1])]
    text = join_pair(pair=pair)
    log.append(text)
    print(text)


title_list = [remove_markup(t) for t in titles]

# rhymes = []
# print('\n\n\n-- RHYMES --')
# log.append('\n\n\n-- RHYMES --')
# for t in title_list:
#     base = base_title(t)
#     for rhyme in pronouncing.rhymes(base):
#         if rhyme in titles:
#             pair = order_pair(t, rhyme)
#             text = join_pair(pair=pair)
#             if text not in rhymes:
#                 rhymes.append(text)
#                 # log.append(text)
#                 # print(text)
#
# random.shuffle(rhymes)
# print('\n'.join(rhymes))
# log.append('\n'.join(rhymes))


if saveToFile:
    fns = [fn for fn in os.listdir('dump')]
    i = 1
    while f'words_{i}.txt' in fns:
        i += 1

    with open(f'dump/words_{i}.txt' , 'w+', encoding='utf-8') as f:
      f.write('\n'.join(log))



