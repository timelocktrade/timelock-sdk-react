import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'src/generated/timelock.ts': {
      schema: 'https://indexer.dev.hyperindex.xyz/9600e01/v1/graphql',
      documents: 'src/graphql/timelock.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        useIndexSignature: true,
        enumsAsTypes: true,
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        inlineFragmentTypes: 'combine',
        nonOptionalTypename: true,
        preResolveTypes: true,
        namingConvention: {
          typeNames: 'pascal-case#pascalCase',
          enumValues: 'upper-case#upperCase',
        },
      },
    },
    'src/generated/univ4.ts': {
      schema: 'http://localhost:8080/v1/graphql',
      documents: 'src/graphql/univ4.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        useIndexSignature: true,
        enumsAsTypes: true,
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        inlineFragmentTypes: 'combine',
        nonOptionalTypename: true,
        preResolveTypes: true,
        namingConvention: {
          typeNames: 'pascal-case#pascalCase',
          enumValues: 'upper-case#upperCase',
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
