import CollectionsOverview from "../../../components/Collections/CollectionsOverview";
import useCollectionsStore from "../../../store/collections/useCollectionsStore";
import CollectionList from "../../../components/Collections/CollectionList";
import { CollectionPageWrapper } from "../../../styles/collectionspage/collections";



const CollectionsPage = () => {
  const { collections } = useCollectionsStore();

  return (
    <CollectionPageWrapper>
      <CollectionsOverview />
      <CollectionList collections={collections} />
    </CollectionPageWrapper>  
  );
};

export default CollectionsPage;