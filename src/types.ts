type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  text: string;
  cardsUrl: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}
