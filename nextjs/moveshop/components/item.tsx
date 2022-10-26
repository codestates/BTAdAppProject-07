import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import {NextPage} from "next";
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from "react";
import {ItemProps} from "../interface/props/itemProps";

const Item: NextPage<ItemProps> = (props) => {
  const {value, title} = props;

  return (
    <Card sx={{maxWidth: '15rem'}}>
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="NFT 이미지"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          # {value}
        </Typography>
        <Typography>
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Item
