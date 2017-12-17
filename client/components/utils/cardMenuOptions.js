import { Share, Clipboard } from 'react-native';


export const share = (props) => {
  const { 
    title = 'Pocket History', 
    message = '',
    optionText = 'Share',
    iconProps = { name: 'share' }
  } = props;
  return {
    onSelect: () => Share.share({ title, message }),
    iconProps,
    optionText
  }
}

export const copy = (props) => {
  const { 
    content = '',
    onSelect = () => Clipboard.setString(props.content),
    optionText = 'Copy',
    iconProps = { name: 'clipboard', type: 'font-awesome' }
  } = props;
  return {
    onSelect,
    iconProps,
    optionText
  }
}

export const save = (props) => {
  const { 
    optionText = 'Save',
    iconProps = { name: 'star'},
    onSelect = () => null 
  } = props;
  return {
    onSelect,
    iconProps,
    optionText
  }
}

export const remove = (props) => {
  const { 
    optionText = 'Remove',
    iconProps = { name: 'remove', type:'font-awesome'},
    onSelect = () => null 
  } = props;
  return {
    onSelect,
    iconProps,
    optionText
  }
}