import styles from "./IconElement.module.css";
import pickUpBadgeError from '../assets/pickUpBadgeError.svg';
import pickUpBadgePresent from '../assets/pickUpBadgePresent.svg';
import pickUpBadgeBlank from '../assets/pickUpBadgeBlank.svg';
import dropOffBadgeError from '../assets/dropOffBadgeError.svg';
import dropOffBadgePresent from '../assets/dropOffBadgePresent.svg';
import dropOffBadgeBlank from '../assets/dropOffBadgeBlank.svg';

const IconElement = ({ color, badge }) => {
    const icons = {
        pickup: {
          red: pickUpBadgeError,
          orange: pickUpBadgePresent,
          blank: pickUpBadgeBlank,
        },
        dropoff: {
          red: dropOffBadgeError,
          green: dropOffBadgePresent,
          blank: dropOffBadgeBlank,
        },
      };
  return <img src={icons[badge][color]} alt="Icon" className={styles.icon} />;
};

export default IconElement;

