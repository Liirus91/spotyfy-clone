'use client';

import { Song } from '@/types';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';
import { useState } from 'react';

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  return (
    <div className="grid grid-cols-2 h-full md:grid-cols-3">
      <div className="flex justify-start w-full">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex col-auto md:hidden w-full items-center justify-end">
        <div
          onClick={() => {}}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="w-full h-full hidden md:flex justify-center items-center max-w-[722px] gap-x-6">
        <AiFillStepBackward
          size={30}
          onClick={onPlayPrevious}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={() => {}}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          onClick={onPlayNext}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="hidden md:flex w-full pr-2 justify-end">
        <div className="flex items-center w-[120px] gap-x-2">
          <VolumeIcon size={30} onClick={() => {}} className="cursor-pointer" />
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;