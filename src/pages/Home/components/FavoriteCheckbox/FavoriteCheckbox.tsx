import { Checkbox } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteCheckbox: React.FC<{ checked: boolean, onChange: () => void }> = (props) => {
    return (
        <Checkbox
            icon={<FavoriteBorderIcon style={{ color: props.checked ? 'inherit' : 'grey' }} />}
            checkedIcon={<FavoriteIcon style={{ color: props.checked ? 'purple' : 'grey' }} />}
            {...props}
        />
    );
}

export default FavoriteCheckbox;