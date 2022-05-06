import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import galleryIcon from 'assets/img/gallery.webp';

interface ISender {
  sendMessage(value: string): void;
  getPhoto(file: any): void;
  photoLoading: boolean;
}

const Sender = ({ sendMessage, getPhoto, photoLoading }: ISender) => {
  const [message, setMessage] = useState('');
  const [imageAsFile, setImageAsFile] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ref = textareaRef.current;

  const handleImageAsFile = (e: any) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const submitMessageHandler = () => {
    if (!message.length) {
      return;
    }
    sendMessage(message);
    setMessage('');
    if (ref) {
      ref.style.height = '36px';
    }
  };

  useEffect(() => {
    const ref = textareaRef.current;
    if (ref) {
      const scrollHeight = ref.scrollHeight;
      ref.style.height = scrollHeight + 'px';
    }
  }, [message]);

  useEffect(() => {
    if (imageAsFile) {
      getPhoto(imageAsFile);
    }
  }, [imageAsFile]);

  return (
    <form className={styles.sendContainer}>
      <textarea
        ref={textareaRef}
        onChange={({ target }) => setMessage(target.value)}
        value={message}
      />
      <button
        disabled={photoLoading}
        type='button'
        className='btn'
        onClick={submitMessageHandler}
      >
        Send
      </button>
      <label htmlFor='upload-photo'>
        <img src={galleryIcon} alt='open gallery' />
      </label>
      <input
        name='photo'
        id='upload-photo'
        accept='image/png, image/gif, image/jpeg'
        className={styles.uploadPhoto}
        onChange={handleImageAsFile}
        type='file'
      />
    </form>
  );
};

export default Sender;
