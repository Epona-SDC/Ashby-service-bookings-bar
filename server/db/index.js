const Cassandra = require('cassandra-driver');

const keyspaceName = 'availability';
const contactPts = ['127.0.0.1:9042'];
const dataCenter = 'datacenter1';

const cassie = new Cassandra.Client({
  contactPoints: contactPts,
  localDataCenter: dataCenter,
  keyspace: keyspaceName,
});

// promises successul commands!
cassie.connect()
  .then(() => {
    console.log(`Connected to ${cassie.hosts.length} nodes in the cluster: ${cassie.hosts.keys().join(', ')}`);
  })
  .catch((err) => {
    console.error(`issue connecting to Cassandra keyspace ${keyspaceName} in data center ${dataCenter} at contact points ${contactPoints}`, err);
  });


module.exports = cassie;

// callback option works! Nothing is sent in result on successful connection
// cassie.connect((err, result) => {
//   if (err) {
//     console.error('issue!', err);
//   } else {
//     console.log('success!', result);
//   }
// })

// despite being highlighted in documentation, did not work
// await cassie.connect();