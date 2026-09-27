import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);

  // Controle da tela ativa no momento
  telaAtual: 'login' | 'registro' | 'esqueci-senha' = 'login';

  // Dados do Login
  email: string = '';
  senha: string = '';

  // Dados de Criar Conta
  nomeRegistro: string = '';
  emailRegistro: string = '';
  senhaRegistro: string = '';
  confirmarSenhaRegistro: string = '';

  // Dados de Esqueci a Senha
  emailRecuperacao: string = '';

  // Estados auxiliares
  mostrarSenha: boolean = false;
  mensagemFeedback: string = '';
  tipoFeedback: 'sucesso' | 'erro' | 'info' = 'info';

  /**
   * Alterna entre as telas
   */
  irParaTela(tela: 'login' | 'registro' | 'esqueci-senha', event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.telaAtual = tela;
    this.mensagemFeedback = '';

    if (tela === 'esqueci-senha' && this.email && !this.emailRecuperacao) {
      this.emailRecuperacao = this.email;
    }
  }

  /**
   * 1. Ação de Login
   */
  fazerLogin(): void {
    if (!this.email || !this.senha) {
      this.tipoFeedback = 'erro';
      this.mensagemFeedback = 'Por favor, preencha o e-mail e a senha antes de entrar!';
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.tipoFeedback = 'sucesso';
        this.mensagemFeedback = `Login efetuado com sucesso para: ${this.email}!`;
        console.log('Token recebido:', response.token);
      },
      error: (err) => {
        this.tipoFeedback = 'erro';
        this.mensagemFeedback = err?.error?.message || 'E-mail ou senha inválidos.';
        console.error('Erro no login:', err);
      }
    });
  }

  /**
   * 2. Ação de Criar Conta
   */
  cadastrarConta(): void {
    if (!this.nomeRegistro || !this.emailRegistro || !this.senhaRegistro || !this.confirmarSenhaRegistro) {
      this.tipoFeedback = 'erro';
      this.mensagemFeedback = 'Preencha todos os campos para realizar o cadastro!';
      return;
    }

    if (this.senhaRegistro !== this.confirmarSenhaRegistro) {
      this.tipoFeedback = 'erro';
      this.mensagemFeedback = 'As senhas digitadas não coincidem. Verifique e tente novamente!';
      return;
    }

    this.tipoFeedback = 'sucesso';
    this.mensagemFeedback = `Conta criada com sucesso para ${this.nomeRegistro}! (esta funcionalidade ainda é simulada no frontend)`;
  }

  /**
   * 3. Ação de Esqueci a Senha
   */
  enviarRecuperacao(): void {
    if (!this.emailRecuperacao) {
      this.tipoFeedback = 'erro';
      this.mensagemFeedback = 'Informe o seu e-mail cadastrado para recuperar a senha!';
      return;
    }

    this.tipoFeedback = 'sucesso';
    this.mensagemFeedback = `Link de redefinição de senha enviado para: ${this.emailRecuperacao}!`;
  }

  /**
   * Alterna a exibição da senha
   */
  toggleMostrarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
