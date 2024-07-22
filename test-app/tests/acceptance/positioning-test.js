import { module, test } from 'qunit';
import { visit, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { drag } from 'ember-sortable/test-support';

async function assertPositions(assert, itemElements) {
  const intialPositions = new WeakMap();
  const firstElement = itemElements[0];

  itemElements.forEach((element) => intialPositions.set(element, element.getBoundingClientRect()));

  await drag('mouse', firstElement, () => ({ dx: 20, dy: 20 }), {
    beforedragend() {
      itemElements.forEach((element) => {
        let intialPosition = intialPositions.get(element);
        let currentPosition = element.getBoundingClientRect();

        if (element == firstElement) {
          assert.notDeepEqual(currentPosition, intialPosition, 'The element is in the correct position');
        } else {
          assert.deepEqual(currentPosition, intialPosition, 'The element is in the correct position');
        }
      });
    },
  });
}

module('Acceptance | positioning', function (hooks) {
  setupApplicationTest(hooks);

  test('correctly positions items vertically when there is no gap', async function (assert) {
    assert.expect(5);

    await visit('/');

    const containerElement = find('[data-test-vertical-demo-group]');
    const itemElements = Array.from(containerElement.querySelectorAll('[data-test-vertical-demo-item] .handle'));

    await assertPositions(assert, itemElements);
  });

  test('correctly positions items vertically when there is a gap', async function (assert) {
    assert.expect(5);

    await visit('/');

    const containerElement = find('[data-test-vertical-demo-group]');
    const itemElements = Array.from(containerElement.querySelectorAll('[data-test-vertical-demo-item] .handle'));

    Object.assign(containerElement.style, {
      display: 'grid',
      rowGap: '20px',
      columnGap: '10px',
      gridTemplateColumns: '1fr',
    });

    await assertPositions(assert, itemElements);
  });

  test('correctly positions items horizontally when there is no gap', async function (assert) {
    await visit('/');

    assert.expect(5);

    const containerElement = find('[data-test-horizontal-demo-group]');
    const itemElements = Array.from(containerElement.querySelectorAll('[data-test-horizontal-demo-handle]'));

    await assertPositions(assert, itemElements);
  });

  test('correctly positions items horizontally when there is a gap', async function (assert) {
    await visit('/');

    assert.expect(5);

    const containerElement = find('[data-test-horizontal-demo-group]');
    const itemElements = Array.from(containerElement.querySelectorAll('[data-test-horizontal-demo-handle]'));

    Object.assign(containerElement.style, {
      display: 'grid',
      rowGap: '20px',
      columnGap: '10px',
      gridTemplateColumns: 'repeat(5, 1fr)',
    });

    await assertPositions(assert, itemElements);
  });

  test('correctly positions items in a grid when there is no gap', async function (assert) {
    await visit('/');

    assert.expect(26);

    const containerElement = find('[data-test-grid-demo-group]');
    const itemElements = Array.from(containerElement.querySelectorAll('[data-test-grid-demo-handle]'));

    await assertPositions(assert, itemElements);
  });

  test('correctly positions items in a grid when there is a gap', async function (assert) {
    await visit('/');

    assert.expect(26);

    const containerElement = find('[data-test-grid-demo-group]');
    const itemElements = Array.from(containerElement.querySelectorAll('[data-test-grid-demo-handle]'));

    Object.assign(containerElement.style, {
      rowGap: '20px',
      columnGap: '10px',
    });

    await assertPositions(assert, itemElements);
  });
});
