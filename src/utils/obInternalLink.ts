import { TFile } from 'obsidian';

export const replaceMd = (internalLink: string, label: string): string => {
  const file = app.metadataCache.getFirstLinkpathDest(decodeURIComponent(internalLink), '');

  // let filePath;

  if (file instanceof TFile) {
    // filePath = file.path;
    if (label) {
      // console.log(`<a data-href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link">${label}</a>`);
      // return `<a data-href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link">${label}</a>`;
      return `<a data-href="${file.basename}" href="${file.basename}" data-type="link" data-filepath="${internalLink}" class="internal-link">${file.basename}</a>`;
    } else {
      // return `<a data-href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link">${internalLink}</a>`;
      return `<a data-href="${file.basename}" href="${file.basename}" data-type="link" data-filepath="${internalLink}" class="internal-link">${file.basename}</a>`;
    }
  } else if (label) {
    return `<a data-href="${internalLink}" href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link is-unresolved">${label}</a>`;
    // return `<a data-href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link is-unresolved">${label}</a>`;
  } else {
    return `<a data-href="${internalLink}" href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link is-unresolved">${internalLink}</a>`;
  }
};
