document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.options').forEach((group) => {
        const buttons = group.querySelectorAll('.circle');
        const question = group.previousElementSibling;

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // 선택 초기화하고 새 선택 적용
                buttons.forEach(b => b.classList.remove('selected'));
                button.classList.add('selected');
                // 흐림
                group.classList.add('faded');
                if (question && question.classList.contains('question')) {
                    question.classList.add('faded');
                }
            });
        });
    });
});
