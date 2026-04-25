const geojsonUrl = 'https://s3.amazonaws.com/og-production-open-data-bostonma-892364687672/resources/2f575489-e721-45ec-865a-e98f10d2ee85/bprd_trees.geojson?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJJIENTAPKHZMIPXQ%2F20260425%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260425T101225Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=1d4452e31bb8e4881a98d1f47be13358b6aaad2ba80341702612bfa0131239de';

function loadTreeData() {
  return d3.json(geojsonUrl).then(data => 
    data.features.map(feature => ({
      position: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]
    }))
  );
}
