import { Flex } from "../lib/main.js";

export function App() {
  return (
    <Flex direction="vertical" height="fill" width="fill">
      <Flex
        align="center"
        class="a"
        direction="horizontal"
        height={70}
        width="fill"
      >
        <Flex align="center" direction="vertical">
          <Flex>Title</Flex>
          <Flex>Sub-title</Flex>
        </Flex>
      </Flex>
      <Flex direction="horizontal" height="fill" width="fill">
        <Flex class="b" height="fill" scroll>
          <div class="w-[220px] p-2">
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
          </div>
        </Flex>
        <Flex class="e" direction="vertical" height="fill" width={200}>
          <Flex class="border-b border-black p-2" width="fill">
            Search…
          </Flex>
          <Flex direction="vertical" height="fill" scroll width="fill">
            {Array.from(Array(20).keys()).map((_, key) => (
              <Flex class="px-4 py-2" key={key} width="fill">{`Item ${
                key + 1
              }`}</Flex>
            ))}
          </Flex>
        </Flex>
        <Flex class="c" direction="vertical" height="fill" width="fill">
          <Flex class="border-b border-black" width="fill">
            Sub-title—Lorem ipsum officia ullamco enim et in sint pariatur et
            occaecat cillum deserunt incididunt
          </Flex>
          <Flex height="fill" scroll>
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
          </Flex>
          <Flex class="border-t border-black" width="fill">
            Extra options
          </Flex>
        </Flex>
        <Flex
          align="center"
          class="b"
          direction="vertical"
          height="fill"
          width={200}
        >
          <Flex>…</Flex>
        </Flex>
      </Flex>
      <Flex class="d" direction="horizontal" gap="auto" width="fill">
        <Flex>
          <button>Cancel</button>
        </Flex>
        <Flex>
          <button>Save</button>
        </Flex>
      </Flex>
    </Flex>
  );
}
