async function global_error_handler() {
  try {
    await controller();
  } catch (e) {
    console.log(e.message);
  }
  console.log('end');
}

async function create() {
  console.log('create function');
  throw new Error('an exception is thrown');
}

function controller() {
  create();
}

global_error_handler();
