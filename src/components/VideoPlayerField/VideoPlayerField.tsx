import { OrderTypeOrmEntityArtistClient } from 'api/generated';
import React, { FC, HtmlHTMLAttributes } from 'react';
import { useRecordContext } from 'react-admin';
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
      <MuxPlayer
        playbackId={playbackId}
        // metadata={{
        //   video_id: 'video-id-123456',
        //   video_title: 'Bick Buck Bunny',
        //   viewer_user_id: 'user-id-bc-789',
        // }}
        streamType="on-demand"
      />
    </Root>
  );
};

const Root = styled('div')(() => ({
  width: 500,
}));

export default VideoPlayerField;
