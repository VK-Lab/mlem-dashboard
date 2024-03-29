import hexToRgb from '@mlem-admin/theme/functions/hexToRgb';

function rgba(color: string, opacity: number) {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}

export default rgba;
