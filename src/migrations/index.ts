import * as migration_20261020_040200 from './20261020_040200';

export const migrations = [
  {
    up: migration_20261020_040200.up,
    down: migration_20261020_040200.down,
    name: '20261020_040200'
  },
];
