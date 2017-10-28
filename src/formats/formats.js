import YAML from './yaml';
import TOML from './toml';
import JSONFormatter from './json';
import Frontmatter from './frontmatter';

export const formatToExtension = format => ({
  markdown: 'md',
  yaml: 'yml',
  json: 'json',
  html: 'html',
}[format]);

function formatByType(type) {
  // Right now the only type is "editorialWorkflow" and
  // we always returns the same format
  return new Frontmatter();
}

export function formatByExtension(extension) {
 const Formatter = {
    yml: YAML,
    yaml: YAML,
    toml: TOML,
    json: JSONFormatter,
    md: Frontmatter,
    markdown: Frontmatter,
    html: Frontmatter,
  }[extension] || Frontmatter;
  return new Formatter();
}

function formatByName(name) {
  const Formatter = {
    yml: YAML,
    yaml: YAML,
    toml: TOML,
    frontmatter: Frontmatter,
  }[name] || Frontmatter;
  return new Formatter();
}

export function resolveFormat(collectionOrEntity, entry) {
  if (typeof collectionOrEntity === 'string') {
    return formatByType(collectionOrEntity);
  }
  const path = entry && entry.path;
  if (path) {
    return formatByExtension(path.split('.').pop());
  }
  return formatByName(collectionOrEntity.get('format'));
}
