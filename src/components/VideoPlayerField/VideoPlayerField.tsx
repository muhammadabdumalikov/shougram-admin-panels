import React, { FC, HtmlHTMLAttributes } from 'react';
import { styled } from '@mui/material/styles';
import MuxPlayer from '@mux/mux-player-react';

export interface VideoPlayerFieldProps
  extends HtmlHTMLAttributes<HTMLDivElement> {
  playbackId?: string;
}
const VideoPlayerField: FC<VideoPlayerFieldProps> = ({
  playbackId,
  ...props
}) => {
  return (
    <Root {...props}>
      <MuxPlayer playbackId={playbackId} streamType="on-demand" />
    </Root>
  );
};

const Root = styled('div')(() => ({
  width: 250,
}));

export default VideoPlayerField;
