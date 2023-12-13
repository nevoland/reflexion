import { Flex } from "../lib/main.js";

export function App() {
  return (
    <Flex class="h-full" container direction="column">
      <Flex
        align="start"
        class="a h-[70px]"
        container
        direction="row"
        item
        justify="start"
      >
        <Flex align="center" item justify="center">
          Title
          <br />
          Sub-title
        </Flex>
      </Flex>
      <Flex container direction="row" grow item>
        <Flex class="b" item scroll>
          <div class="w-[220px] pt-2">
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
          </div>
        </Flex>
        <Flex class="e w-[200px]" container direction="column">
          <Flex class="border-b border-black p-2" item>
            Search…
          </Flex>
          <Flex grow item scroll>
            {Array.from(Array(20).keys()).map((_, key) => (
              <Flex
                align="center"
                class="px-4 py-2"
                container
                item
                justify="start"
                key={key}
              >{`Item ${key + 1}`}</Flex>
            ))}
          </Flex>
        </Flex>
        <Flex class="c" container direction="column" grow item>
          <Flex class="border-b border-black" item>
            Sub-title—Lorem ipsum officia ullamco enim et in sint pariatur et
            occaecat cillum deserunt incididunt
          </Flex>
          <Flex grow item scroll>
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
          <Flex class="border-t border-black" item>
            Extra options
          </Flex>
        </Flex>
        <Flex
          align="center"
          class="b w-[200px]"
          container
          item
          justify="center"
        >
          …
        </Flex>
      </Flex>
      <Flex class="d" container direction="row" item>
        <Flex item>
          <button>Cancel</button>
        </Flex>
        <Flex grow item />
        <Flex item>
          <button>Save</button>
        </Flex>
      </Flex>
    </Flex>
  );
}
