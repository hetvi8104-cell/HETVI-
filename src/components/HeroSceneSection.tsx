import React from 'react';
import { EditorialCoverHero } from './EditorialCoverHero';
import { ExhibitionProject } from '../data/exhibitionData';

interface HeroSceneSectionProps {
  onSelectProject: (project: ExhibitionProject) => void;
  onExploreClick: () => void;
  isDarkTheme: boolean;
}

export const HeroSceneSection: React.FC<HeroSceneSectionProps> = (props) => {
  return <EditorialCoverHero {...props} />;
};

export default HeroSceneSection;
