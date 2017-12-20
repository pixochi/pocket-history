import { copy, share, remove } from '../../../components/utils/cardMenuOptions';

export const createCardMenuOptions = (item, contentShare, copyToClipboard, removeFact) => {
  return [
    copy({ onSelect: copyToClipboard }),
    share({ message: contentShare }),
    remove({ onSelect: removeFact })
  ]
}