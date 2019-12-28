export default function map(type, files, isRootDir) {
  let mapped = [];
  if (!isRootDir) {
    mapped.push({ name: "..", isDir: true });
  }
  switch (type) {
    case "sftp": {
      mapped = mapped.concat(
        files.map(file => ({
          name: file.filename,
          isDir: file.attrs.isDirectory()
        }))
      );
      break;
    }
    default:
      break;
  }
  return mapped;
}
