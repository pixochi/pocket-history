import { copy, share, remove } from '../../../components/utils/cardMenuOptions';

export const createCardMenuOptions = (item, contentShare, copyToClipboard, removeFact) => {
	const { id, text } = item;
  return [
    copy({ onSelect: copyToClipboard }),
    share({ message: contentShare }),
    remove({ onSelect: removeFact })
  ]
}