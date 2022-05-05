export default function calculateTransition(posX, gapX, posY, width) {
  const top = posY + gapX
  const left = posX - width / 2
  return { y: `${top}px`, x: `${left}px`, z: 0 }
}
