'use client';

import { useEffect } from 'react';

import { updatePiece } from '@/app/lib/actions';
import { STATUS_COMPLETED, STATUS_FOUND } from './statuses';
import { Piece } from '@/app/lib/definitions';

export default function Status({ travelerId, piece }: { travelerId: string, piece: Piece | null }) {
  useEffect(() => {
    if (travelerId.length > 0 && piece && piece.status !== STATUS_COMPLETED) {
      updatePiece(travelerId, Number(piece?.piece_id), STATUS_FOUND, null, null);
    }
  }, [travelerId])

  return (
    <div>Piece: #{piece?.piece_id}</div>
  )
}