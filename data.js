const geojsonUrl = 'https://s3.amazonaws.com/og-production-open-data-bostonma-892364687672/resources/2f575489-e721-45ec-865a-e98f10d2ee85/bprd_trees.geojson?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJJIENTAPKHZMIPXQ%2F20260331%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260331T114803Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=a70c3a4b49c7a7b2a8262063ffded8ce6c757dfadc9828e99156b6016c349467';

function loadTreeData() {
  return d3.json(geojsonUrl).then(data => 
    data.features.map(feature => ({
      position: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]
    }))
  );
}