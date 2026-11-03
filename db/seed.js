import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 50000);
  }

  // Create 2 users
  const user1 = await createUser("brandon", "localghost");
  const user2 = await createUser("adrianna", "arw0422");

  // Give each user a playlist
  const playlist1 = await createPlaylist(
    "Subspace Highway",
    "Songs to Code 2",
    user1.id,
  );

  const playlist2 = await createPlaylist(
    "Hot Girl music",
    "New Mexico Road Trip",
    user2.id,
  );

  for (let i = 1; i <= 5; i++) {
    await createPlaylistTrack(playlist1.id, i);
    await createPlaylistTrack(playlist2.id, i + 5);
  }
}
