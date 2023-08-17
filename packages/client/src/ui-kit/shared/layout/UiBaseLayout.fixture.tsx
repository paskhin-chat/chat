import { FC } from 'react';
import { Typography } from '@mui/material';

import { UiBasePageLayout } from 'shared';
import { withGlobalStyles } from '../../__utils__';

const UiBaseLayoutFixture: FC = () => (
  <UiBasePageLayout
    contentHeader={<Typography>Content header</Typography>}
    asideHeader={<Typography>Aside header</Typography>}
    aside={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet
      asperiores consectetur deleniti dolore, eos ex illo ipsum, maxime omnis
      quidem sed veniam, veritatis voluptate voluptates? Et fugiat in laborum
      maxime tenetur! Eos eveniet id neque numquam quo, tempore veritatis
      voluptatem. Corporis delectus est harum magnam maiores maxime vero vitae
      voluptatem. Ad deserunt dignissimos dolores et excepturi ipsum itaque magni
      molestias mollitia non, reprehenderit rerum, sapiente tempora. Debitis
      dolorum eaque facilis, fugit illo, maiores nostrum pariatur perferendis quia
      quis quo quos sint. Ab culpa deleniti dicta doloribus error hic ipsa magnam
      nostrum optio praesentium, quo quos repellat similique soluta vitae?`}
  >
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet
    asperiores consectetur deleniti dolore, eos ex illo ipsum, maxime omnis
    quidem sed veniam, veritatis voluptate voluptates? Et fugiat in laborum
    maxime tenetur! Eos eveniet id neque numquam quo, tempore veritatis
    voluptatem. Corporis delectus est harum magnam maiores maxime vero vitae
    voluptatem. Ad deserunt dignissimos dolores et excepturi ipsum itaque magni
    molestias mollitia non, reprehenderit rerum, sapiente tempora. Debitis
    dolorum eaque facilis, fugit illo, maiores nostrum pariatur perferendis quia
    quis quo quos sint. Ab culpa deleniti dicta doloribus error hic ipsa magnam
    nostrum optio praesentium, quo quos repellat similique soluta vitae? Lorem
    ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet asperiores
    consectetur deleniti dolore, eos ex illo ipsum, maxime omnis quidem sed
    veniam, veritatis voluptate voluptates? Et fugiat in laborum maxime tenetur!
    Eos eveniet id neque numquam quo, tempore veritatis voluptatem. Corporis
    delectus est harum magnam maiores maxime vero vitae voluptatem. Ad deserunt
    dignissimos dolores et excepturi ipsum itaque magni molestias mollitia non,
    reprehenderit rerum, sapiente tempora. Debitis dolorum eaque facilis, fugit
    illo, maiores nostrum pariatur perferendis quia quis quo quos sint. Ab culpa
    deleniti dicta doloribus error hic ipsa magnam nostrum optio praesentium,
    quo quos repellat similique soluta vitae? Lorem ipsum dolor sit amet,
    consectetur adipisicing elit. Adipisci amet asperiores consectetur deleniti
    dolore, eos ex illo ipsum, maxime omnis quidem sed veniam, veritatis
    voluptate voluptates? Et fugiat in laborum maxime tenetur! Eos eveniet id
    neque numquam quo, tempore veritatis voluptatem. Corporis delectus est harum
    magnam maiores maxime vero vitae voluptatem. Ad deserunt dignissimos dolores
    et excepturi ipsum itaque magni molestias mollitia non, reprehenderit rerum,
    sapiente tempora. Debitis dolorum eaque facilis, fugit illo, maiores nostrum
    pariatur perferendis quia quis quo quos sint. Ab culpa deleniti dicta
    doloribus error hic ipsa magnam nostrum optio praesentium, quo quos repellat
    similique soluta vitae? Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Adipisci amet asperiores consectetur deleniti dolore, eos ex illo
    ipsum, maxime omnis quidem sed veniam, veritatis voluptate voluptates? Et
    fugiat in laborum maxime tenetur! Eos eveniet id neque numquam quo, tempore
    veritatis voluptatem. Corporis delectus est harum magnam maiores maxime vero
    vitae voluptatem. Ad deserunt dignissimos dolores et excepturi ipsum itaque
    magni molestias mollitia non, reprehenderit rerum, sapiente tempora. Debitis
    dolorum eaque facilis, fugit illo, maiores nostrum pariatur perferendis quia
    quis quo quos sint. Ab culpa deleniti dicta doloribus error hic ipsa magnam
    nostrum optio praesentium, quo quos repellat similique soluta vitae?
  </UiBasePageLayout>
);

export default withGlobalStyles(UiBaseLayoutFixture);
