import { clsx } from "clsx";
import { useEffect, useRef, useState } from "preact/hooks";

import { Flex } from "../lib/main.js";

function TableHeaderList({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollLeft = value;
  }, [value]);
  return (
    <Flex
      Component="div"
      class="d"
      direction="horizontal"
      overflow="hidden"
      ref={ref}
      width="fill"
    >
      <Flex class="TableHeaderList" direction="horizontal">
        <Flex
          onClick={(event) => {
            event.preventDefault();
          }}
        />
        <Flex align="left" height={38} width={200}>
          Header A
        </Flex>
        <Flex align="left" height={38} width={200}>
          Header B
        </Flex>
        <Flex align="left" height={38} width={200}>
          Header C
        </Flex>
      </Flex>
    </Flex>
  );
}

function TableRow() {
  return (
    <Flex
      class="a border-b border-black"
      direction="horizontal"
      minWidth="fill"
    >
      <Flex align="left" height={36} width={200}>
        <span class="w-full truncate">
          Tempora aut sint corrupti. Repudiandae sit dolorem ut quia eos nulla
          nemo et. Et ut dicta mollitia eligendi molestiae. Voluptate minima
          aperiam id voluptatum voluptatibus quos nulla adipisci. Sit at velit
          facere culpa magni earum.
        </span>
      </Flex>
      <Flex align="left" direction="horizontal" height={36} width={200}>
        Gregg Reynolds
      </Flex>
      <Flex align="left" direction="horizontal" height={36} width={200}>
        Charles Cremin
      </Flex>
    </Flex>
  );
}

function TableRowList({ onChange }: { onChange: (value: number) => void }) {
  return (
    <Flex
      class="TableRowList"
      height="fill"
      onScroll={(event) => onChange(event.currentTarget.scrollLeft)}
      scroll
      width="fill"
    >
      <Flex
        class="c"
        direction="vertical"
        height={4000}
        minWidth="fill"
        width="hug"
      >
        <Flex
          direction="vertical"
          minWidth="fill"
          style={{ transform: `translateY(${3 * 36}px)` }}
        >
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
        </Flex>
      </Flex>
    </Flex>
  );
}

function Table({ class: className }: { class?: string }) {
  const [value, onChange] = useState(0);
  return (
    <Flex
      class={clsx("Table", className)}
      direction="vertical"
      height="fill"
      width="fill"
    >
      <TableHeaderList value={value} />
      <TableRowList onChange={onChange} />
    </Flex>
  );
}

export function App() {
  return (
    <Flex direction="vertical" height="fill" width="fill">
      <Flex
        align="center"
        class="a"
        direction="horizontal"
        height={100}
        width="fill"
      >
        <Flex align="center" direction="vertical">
          <Flex Component="span">Title</Flex>
          <Flex>Sub-title</Flex>
        </Flex>
      </Flex>
      <Flex direction="horizontal" height="fill" width="fill">
        <Flex class="b" height="fill" noShrink scroll width={220}>
          <div class="p-2">
            Lorem ipsum officia ullamco enim et in sint pariatur et occaecat
            cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut
            elit minim ut sed dolore tempor in ut ad velit adipisicing dolore
            nostrud minim veniam sit sit ex incididunt dolore magna in
            incididunt id nostrud dolor ut irure proident deserunt cillum
            reprehenderit velit occaecat magna commodo sunt pariatur do nostrud
            culpa proident et ut labore nulla magna est quis ut enim laborum.
          </div>
        </Flex>
        <Flex class="relative" direction="vertical" height="fill" width="fill">
          <Table class="absolute inset-0" />
        </Flex>
        <Flex class="e" direction="vertical" height="fill" noShrink width={300}>
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
          <Flex class="a" height="fill" scroll>
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
