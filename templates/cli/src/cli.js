import arg from 'arg';
import inquirer from 'inquirer';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--yes': Boolean,
            '-y': '--yes',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        yes: args['--yes'] || false,
    };
}

async function prompt(options) {
    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'fruit',
            message: 'Apples or oranges?',
            choices: ['Apples', 'Oranges'],
            default: 'Apples',
        });
    }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'fine',
            message: 'Fine?',
            default: false,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        fine: options.fine || answers.fine,
        fruit: options.fruit || answers.fruit,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await prompt(options);
}

