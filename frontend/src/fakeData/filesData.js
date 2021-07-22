export const sampleFiles = {
  'sample-folder-1': {
    parent: null,
    name: '2015 Designs',
    isFile: false,
    child: ['sample-folder-5', 'sample-file-2'],
  },
  'sample-folder-2': {
    parent: null,
    name: '2016 Designs',
    isFile: false,
  },
  'sample-folder-3': {
    parent: null,
    name: '2017 Designs',
    isFile: false,
  },
  'sample-folder-4': {
    parent: null,
    name: '2018 Designs',
    isFile: false,
  },
  'sample-file-0': {
    parent: null,
    name: 'budget.pdf',
    isFile: true,
  },
  'sample-file-1': {
    parent: null,
    name: 'profile.jpg',
    isFile: true,
  },
  'sample-folder-5': {
    parent: 'sample-folder-1',
    name: 'Videos',
    isFile: false,
    child: ['sample-file-3'],
  },
  'sample-file-2': {
    parent: 'sample-folder-1',
    name: 'hello.txt',
    isFile: true,
  },
  'sample-file-3': {
    parent: 'sample-folder-5',
    name: 'hello.txt',
    isFile: true,
  },
};
