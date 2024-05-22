import type { Config } from 'jest';

import { getJestProjects } from '@nx/jest';

const config: Config = { projects: getJestProjects() };

export default config;
