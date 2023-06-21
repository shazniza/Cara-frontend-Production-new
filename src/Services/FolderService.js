let folders = [];

function createFolder(name, parent) {
  const newFolder = {
    id: folders.length.toString(),
    name,
    parentId: parent.id,
    children: [],
  };
  folders.push(newFolder);
  parent.children.push(newFolder);
  return newFolder;
}

function getFolderById(id) {
  return Promise.resolve(folders.find(folder => folder.id === id));
}

function getFoldersByParentId(parentId) {
  return Promise.resolve(folders.filter(folder => folder.parentId === parentId));
}

export { createFolder, getFolderById, getFoldersByParentId };
