import * as create from './create'
import * as dlx from './dlx'
import * as exec from './exec'
import * as restart from './restart'
import * as run from './run'
import * as _test from './test'

// This may not be needed now? (since completions/test "inherits" from run)
const test = {
  ...run,
  ..._test,
}

export { create, dlx, exec, restart, run, test }