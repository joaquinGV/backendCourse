/**
 * Simulates the transmission of packets to a set of ports while ensuring
 * that packets with the same ID are sent to different ports, avoiding collisions.
 *
 * @param {number} numberOfPorts - The total number of ports available for transmission.
 * @param {number} transmissionTime - The time it takes for a packet to be transmitted.
 * @param {number[]} packetIds - An array of packet IDs to be transmitted.
 * @returns {number[]} - An array of port numbers to which each packet is sent.
 */
function sentTimes(numberOfPorts, transmissionTime, packetIds) {
    // Initialize a hashmap to store the transmission times for each port.
    const hashmap = {};
  
    // Initialize transmission times for each port to 0.
    for (let i = 0; i < numberOfPorts; i++) {
      hashmap[i] = 0;
    }
    
    // Initialize a count to keep track of the current transmission time.
    let count = 0;
  
    // Initialize an array to store the assigned ports for each packet.
    const packet = [];
    
    // Loop through each packet ID.
    for (const packetId of packetIds) {
      // Calculate the initial hash value for the packet.
      const hashVal = packetId % numberOfPorts;
      
      // If the current port's transmission time is less than or equal to the current count,
      // assign the packet to this port and update the transmission time.
      if (hashmap[hashVal] <= count) {
        packet.push(hashVal);
        hashmap[hashVal] = transmissionTime + count;
        count++;
      } else {
        // If there's a collision, find the next available port and assign the packet to it.
        let newHashVal = (hashVal + 1) % numberOfPorts;
        while (hashmap[newHashVal] > count) {
          newHashVal = (newHashVal + 1) % numberOfPorts;
        }
        hashmap[newHashVal] = transmissionTime + count;
        packet.push(newHashVal);
        count++;
      }
    }
  
    return packet;
  }
  
  // Example usage:
  const numberOfPorts = 4;
  const transmissionTime = 2;
  const packetIds = [1, 2, 3, 4, 5, 6, 7, 8];
  
  const result = sentTimes(numberOfPorts, transmissionTime, packetIds);
  console.log(result);
  