import pprint
import random
import json
import gspread
import os

from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name('../../config/puppypost-dae4df89a47e.json', scope)
with open('../../config/config.json') as f:
    config = json.load(f)

gc = gspread.authorize(credentials)
spreadsheet = gc.open_by_key(config['sheet_key'])
worksheet = spreadsheet.get_worksheet(0)
sheet = worksheet.get_all_values()

# print(sheet)

titles = {}
affinities = set()
for row in sheet[1:]:
    t = row[0]
    if t and t not in titles and t[0] != '*':
        titles[t] = {
            'wt': float(row[1]) if row[1] else 0,
            'rank': int(row[2]) if row[2] else 10,
            'tags': {tag for tag in row[3:] if tag}
        }
        affinities.add(titles[t]['wt'])

pprint.pprint(titles)
pprint.pprint(sorted(list(affinities)))


def make_pair(alliteration=False, animal=False):
    while True:
        l = random.sample(titles.keys(), 2)
        a, b = l

        if is_double_prefix_or_suffix(a, b):
            continue

        if alliteration and (' ' in a or ' ' in b or a[0] != b[0]):
            continue

        if not animal and not alliteration and \
                (('animal' in titles[a]['tags'] and titles[a]['rank'] > 1) or
                 ('animal' in titles[b]['tags'] and titles[b]['rank'] > 1)):
            continue
        break
    return order_pair(a, b)


def is_double_prefix_or_suffix(a, b, strict=True):
    threshold = 1 if strict else 0.8
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


# log = []
# for i in range(5000):
#     # print(' '.join(make_pair(alliteration=True)))
#     pair = ' '.join(make_pair(alliteration=i % 10 == 0))
#     log.append(pair)
#     print(pair)

# with open('words.txt', 'w+') as f:
#   f.write('\n'.join(log))


fns = [fn for fn in os.listdir('dump')]
print(fns)

