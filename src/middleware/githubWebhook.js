import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const repoPath = '/root/app/zeambi-crm-be';

const githubWebhook = async (req, res, next) => {
  try {
    const payload = req.body;
    if (payload.ref === 'refs/heads/master') {
      const changes = payload.commits.some(commit => commit.modified.includes('zeambi-crm-be/'));
      if (changes) {
        if (await updateCode()) {
          console.log('Mã được cập nhật thành công !!');
        } else {
          console.error('Lỗi cập nhật mã !!');
          return res.status(500).send('Lỗi cập nhật mã !!');
        }
      } else {
        console.log('Không có thay đổi trong thư mục "be" !!');
      }
    } else {
      console.log('Not a push to master branch');
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).send('Internal server error');
  }

  next();
};

const updateCode = async () => {
  try {
    const { stdout, stderr } = await execPromise(`cd ${repoPath} && ./deploy.sh`);
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    return true;
  } catch (error) {
    console.error(`exec error: ${error}`);
    return false;
  }
};

export default githubWebhook;