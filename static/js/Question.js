document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.options').forEach((group) => {
        const buttons = group.querySelectorAll('.circle');
        const question = group.previousElementSibling; // <p class="question">

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // 버튼 선택 표시 처리
                buttons.forEach(b => b.classList.remove('selected'));
                button.classList.add('selected');

                // 현재 항목 흐리게 처리
                group.classList.add('faded');
                if (question && question.classList.contains('question')) {
                    question.classList.add('faded');
                }
            });
        });
    });
});
