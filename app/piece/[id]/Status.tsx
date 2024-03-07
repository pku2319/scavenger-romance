'use client';

import { useEffect } from 'react';

import { updatePiece } from '@/app/lib/actions';
import { STATUS_FOUND } from './statuses';

export default function Status({ travelerId, pieceId }: { travelerId: string, pieceId: string }) {
  useEffect(() => {
    if (travelerId.length > 0) {
      updatePiece(travelerId, Number(pieceId), STATUS_FOUND, null, null);
    }
  }, [travelerId])

  return (
    <div>Piece: #{pieceId}</div>
  )
}