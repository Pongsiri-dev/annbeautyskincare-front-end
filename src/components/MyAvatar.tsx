// hooks
import useAuth from "../hooks/useAuth";
// utils
import createAvatar from "../utils/createAvatar";
//
import Avatar, { Props as AvatarProps } from "./Avatar";

// ----------------------------------------------------------------------
interface Props extends AvatarProps {
  image?: {
    id?: number;
    imgPath?: string;
    imgName?: string;
    imgType?: string;
    userId?: number;
    url?: string;
  };
  firstName?: string;
}

export default function MyAvatar(props: Props) {
  const { image, firstName, sx } = props;
  return (
    <Avatar
      src={image?.url}
      alt={image?.imgName}
      color={image?.url ? "default" : createAvatar(firstName || "").color}
      sx={sx}
    >
      {createAvatar(firstName || "").name}
    </Avatar>
  );
}
