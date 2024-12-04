import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

interface HalfRatingProps {
    value: number | null;
    onChange: (rating: number | null) => void;
}

const HalfRating: React.FC<HalfRatingProps> = ({ value, onChange }) => {
    return (
        <Stack spacing={1}>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    onChange(newValue);
                }}
                precision={1}
            />
        </Stack>
    );
};

export default HalfRating;
