import * as migration_20261012_103735 from './20261012_103735';
import * as migration_20261013_110923 from './20261013_110923';

export const migrations = [
  {
    up: migration_20261012_103735.up,
    down: migration_20261012_103735.down,
    name: '20261012_103735',
  },
  {
    up: migration_20261013_110923.up,
    down: migration_20261013_110923.down,
    name: '20261013_110923'
  },
];
