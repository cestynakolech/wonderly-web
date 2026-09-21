#!/usr/bin/env python3
"""POSIX advisory lock held across the entire Node read/validate/write operation.
All cooperating writers must enter here. Never removes the persistent lock file.
Kernel releases flock on process exit. No wait/retry: busy writer fails unchanged.
"""
import fcntl, os, subprocess, sys
root=os.path.realpath(sys.argv[2])
with open(os.path.join(root, '.podtema.lock'), 'a+b') as lock:
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        print('BUSY: another podtema operation holds the lock', file=sys.stderr)
        sys.exit(75)
    env=os.environ.copy()
    env['PODTEMA_LOCK_FD']=str(lock.fileno())
    result=subprocess.run([sys.argv[1], *sys.argv[3:]], env=env, pass_fds=(lock.fileno(),))
    sys.exit(result.returncode)
